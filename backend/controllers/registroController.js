import pool from '../config/db.js';
import { Registro } from "../models/Registro.js";
import { Evento } from "../models/Evento.js";
import { EventoRegistro } from "../models/EventoRegistro.js";

const registro = new Registro();

const obtenerRegistroPorEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const respuesta = await registro.getRegistroByEmail(email);
        if (respuesta[0].length > 0) {
            return res.json(respuesta[0]);
        } else {
            return res.status(404).json({ error: 'No encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const crearRegistro = async (req, res) => {
    const { token, usuario } = req.body;
    try {
        await registro.insertRegistro(3, '', token, usuario);
        res.json({ mensaje: 'Datos guardados correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el registro' });
    }
}

const conferencias = async (req, res) => {
    let { eventos, regalo, email } = req.body;

    if (typeof eventos === 'string') {
        eventos = JSON.parse(eventos);
    }

    if (eventos.length === 0) {
        return res.status(400).json({ error: 'No hay eventos seleccionados' });
    }
    try {
        console.log(email);
        const respuesta = await registro.getRegistroByEmail(email);
        //console.log(respuesta);
        if (respuesta[0].length > 0) {
            const idUsuario = respuesta[0][0].id;
            const registro=respuesta[0][0];

            //eventos.forEach(async elemento => {
            for (const elemento of eventos) {
                const evento = new Evento({});
                const respuesta = await evento.getEventosConJoinById(elemento);
                if (respuesta[0][0].disponibles < 1) {
                    return res.status(400).json({ error: `No hay disponibles para eventoId de ${elemento}` });
                }
                //restar 1 a los disponibles
                try {
                    await pool.query('UPDATE eventos SET disponibles=? WHERE id=?;', [respuesta[0][0].disponibles - 1, elemento]);
                    console.log('Actualizado con éxito');
                } catch (error) {
                    return res.status(404).json({ error: 'Error al actualizar disponibles' });
                }
            }
            //almacenar el registro
            for(const evento of eventos){
                const evento_registro=new EventoRegistro(evento,registro.registro_id);
                console.log(evento,registro.registro_id);
                try {
                    await evento_registro.insertEventoRegistro();
                } catch (error) {
                    return res.status(500).json({ error: 'Error al insertar los datos' });
                }
            }

            try {
                console.log('registro_id',registro.registro_id);
                console.log('regalo_id',regalo);
                await pool.query('UPDATE registros SET regalo_id=? WHERE id=?;',[regalo,registro.registro_id]);
            } catch (error) {
                return res.status(500).json({ error: 'Error al actualizar datos regalo' });
            }
            

            res.json({mensaje:'Actualizado con éxito',tokenBoleto:registro.token});
        } else {
            return res.status(404).json({ error: 'No encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

export {
    obtenerRegistroPorEmail,
    crearRegistro,
    conferencias
}