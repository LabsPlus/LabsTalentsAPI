/* eslint-disable linebreak-style */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IUsuario {

	nome: string;
	email: string;
	senha: string;
	// area:string ;
	// cargo: string;
	// data: string;
	login: string;


}

const bodyValidation: yup.Schema<IUsuario> = yup.object().shape({
    nome: yup.string().required('nome requerido').min(1).trim(),
    email: yup.string().required('email requerido').trim().email(),
    senha:yup.string().required('senha requerida').min(6, 'senha menor de 6 caracters').matches(/[a-zA-Z]/),
    login: yup.string().required('login requerido').min(6).trim(),
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const create =  async (req: Request<{}, {}, IUsuario>, res: Response) => {

    let validatedData : IUsuario | undefined = undefined;

    try {
        validatedData =  await bodyValidation.validate(req.body, {abortEarly: false});
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const ValidationErrors: Record<string, string> = {};

        yupError.inner.forEach (error => { 
            if (error.path === undefined) return;
            ValidationErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({errors : ValidationErrors});
    }

    console.log(validatedData);

 

};