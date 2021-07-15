import { VaccineHistoryPhoto } from "@prisma/client";
import { database } from "../../utilities/database";
import HttpStatusCode from "../../utilities/http";
import { save_file, parse_to_extension } from "../../utilities/files";
import { VaccineHistoryPhotoRequest, VaccineHistoryRequest, VaccineReply, VaccineRequest } from "./types";

const VaccineController = {
  async GetAllVaccineTypes(req: VaccineRequest, rep: VaccineReply) {
    try {
      const vaccine_types = await database.vaccineType.findMany();
      return vaccine_types;
    } catch (error) {
      return rep.internalServerError(error);
    }
  },

  async AddVaccineType(req: VaccineRequest, rep: VaccineReply) {
    try {
      const res = await database.vaccineType.create({
        data: {
          name: req.body.name
        }
      });

      rep.status(HttpStatusCode.CREATED);
      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  },

  async UploadVaccineHistoryPhoto(req: VaccineHistoryPhotoRequest, rep: VaccineReply) {
    const vaccine_history_id = +req.params.vaccine_history_id;
    if (!vaccine_history_id) return rep.notFound();
    if (!req.isMultipart()) return rep.badRequest();

    try {
      const vaccine_history = await database.vaccineHistory.findUnique({ where: { id: vaccine_history_id } });
      if (!vaccine_history) return rep.notFound();
    } catch (error) {
      return rep.internalServerError(error);
    }

    const parts = req.files();

    const vaccine_history_photos: VaccineHistoryPhoto[] = [];
    let count;
    count = await database.vaccineHistoryPhoto.count();
    try {
    } catch (error) {
      return rep.internalServerError(error);
    }

    for await (const part of parts) {
      const ext = parse_to_extension(part.mimetype);
      const filename = `vaccine_history_${vaccine_history_id}_${count}.${ext}`;
      const path = "uploads/" + filename; 

      try {
        await save_file(part.file, filename);
        let result = await database.vaccineHistoryPhoto.create({
          data: {
            vaccine_history_id: vaccine_history_id,
            path: path
          }
        });

        vaccine_history_photos.push(result);
      } catch (error) {
        console.log(error);
        console.log("Error occured when putting a file, continuing...");
        continue;
      }

      count++;
    }

    rep.status(HttpStatusCode.CREATED);
    return vaccine_history_photos;
  },

  async UpdateVaccineHistory(req: VaccineHistoryRequest, rep: VaccineReply) {
    const vaccine_history_id = +req.params.vaccine_history_id;
    if (!vaccine_history_id) return rep.notFound();

    try {
      const res = await database.vaccineHistory.update({
        where: {
          id: vaccine_history_id
        },
        data: {
          date_administered: req.body.date_administered,
          date_valid_until: req.body.date_valid_until,
          vaccine_type_id: req.body.vaccine_type_id
        }
      });

      return res;
    } catch (error) {
      return rep.unprocessableEntity(error);
    }
  }
};

export default VaccineController;
