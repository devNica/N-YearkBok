
import { z } from 'zod'

const PersonalInfoCoreModel = {
    firstname: z.string({
        required_error: "Firstname is required",
        invalid_type_error: "Firstname must be a string"
    }).max(50),
    lastname: z.string({
        required_error: "Lastname is required",
        invalid_type_error: "Lastname must be a string"
    }).max(50),
    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string"
    }).max(100),
    age: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number"
    })
}

const AddPersonalInfoRequestModel = z.object({
    ...PersonalInfoCoreModel,
})

const AddPersonalInfoResponseModel = z.object({
    fullname: z.string()
})

export type AddPersonalInfoInputModel = z.infer<typeof AddPersonalInfoRequestModel>

export const userModels = {
    AddPersonalInfoRequestModel,
    AddPersonalInfoResponseModel
}