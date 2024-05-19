"use client"
import React, { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import "../css/components/modalTask.css";
import { editStorage } from "../utils/localStorage";
import { sounds } from "../utils/functions";

interface ModalTaskProps {
    setShowModal: any
    setTaskData: any
    optionModal: any
    editDataTask: any
    editTaskById: any
    taskData: any
}

export default function ModalTask({ setShowModal, setTaskData, optionModal, editDataTask, editTaskById, taskData }: ModalTaskProps) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const today = new Date().toISOString().split('T')[0];
    const [option, setOption] = useState(optionModal);

    useEffect(() => {
        if (option == 2) {
            setValue("name", editDataTask.name)
            setValue("description", editDataTask.description)
            setValue("date", editDataTask.date)
            setValue("color", editDataTask.color)
        }
    }, [])

    const onSubmit = (data: any) => {

        if (option == 1) {
            const task = {
                id: crypto.randomUUID(),
                name: data.name,
                description: data.description,
                date: data.date,
                color: data.color,
                done: false
            }
            setTaskData((prev: any) => [...prev, task])
            editStorage([...taskData, task])
            setShowModal(false)
        }

        if (option == 2) {
            editTaskById(editDataTask.id, {
                name: data.name,
                description: data.description,
                date: data.date,
                color: data.color,
                done: editDataTask.done
            })
            setShowModal(false)
        }
    }

    return (
        <div className="task-modal">
            <div className="task-modal-overlay">
                {option == 1 && <div className="task-modal-content">
                    <div className="task-modal-header">
                        <span>Crear Tarea</span>
                        <button onClick={() => { sounds(); setShowModal(false) }}><i className="bi bi-x"></i></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-text">
                            <span>Nombre<span>*</span></span>
                            <input type="text" className={`form-control form-control-lg ${errors.name && "input-error"}`} {...register("name", { required: { value: true, message: 'El nombre de la tarea es obligatorio.' }, maxLength: { value: 40, message: 'El largo del nombre debe ser máximo 40 caracteres.' } })} />
                            {errors.name && (
                                <p>{(errors.name as FieldError).message}</p>
                            )}
                        </div>
                        <div className="form-textarea">
                            <span>Descripción</span>
                            <textarea className={`form-control form-control-lg ${errors.description && "input-error"}`} rows={3}  {...register("description", { required: false, maxLength: { value: 300, message: 'El largo de la descripción debe ser máximo 300 caracteres.' } })}></textarea>
                            {errors.description && (
                                <p>{(errors.description as FieldError).message}</p>
                            )}
                        </div>
                        <div className="form-inputs">
                            <div>
                                <span>Fecha de Término</span>
                                <input type="date" className="form-control form-control-lg" defaultValue={today} {...register("date")} />
                            </div>
                            <div>
                                <span>Color</span>
                                <input type="color" className="form-control form-control-lg form-control-color" defaultValue={"#181818"} {...register("color")} />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="btn btn-primary" onClick={()=>{sounds()}}>Crear Tarea</button>
                        </div>
                    </form>
                </div>}

                {option == 2 && <div className="task-modal-content">
                    <div className="task-modal-header">
                        <span>Editar Tarea</span>
                        <button onClick={() => { setShowModal(false) }}><i className="bi bi-x"></i></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-text">
                            <span>Nombre<span>*</span></span>
                            <input type="text" className={`form-control form-control-lg ${errors.name && "input-error"}`} {...register("name", { required: { value: true, message: 'El nombre de la tarea es obligatorio.' }, maxLength: { value: 40, message: 'El largo del nombre debe ser máximo 40 caracteres.' } })} />
                            {errors.name && (
                                <p>{(errors.name as FieldError).message}</p>
                            )}
                        </div>
                        <div className="form-textarea">
                            <span>Descripción</span>
                            <textarea className={`form-control form-control-lg ${errors.description && "input-error"}`} rows={3}  {...register("description", { required: false, maxLength: { value: 300, message: 'El largo de la descripción debe ser máximo 300 caracteres.' } })}></textarea>
                            {errors.description && (
                                <p>{(errors.description as FieldError).message}</p>
                            )}
                        </div>
                        <div className="form-inputs">
                            <div>
                                <span>Fecha de Término</span>
                                <input type="date" className="form-control form-control-lg"  {...register("date")} />
                            </div>
                            <div>
                                <span>Color</span>
                                <input type="color" className="form-control form-control-lg form-control-color" {...register("color")} />
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="btn btn-primary" onClick={()=>{sounds()}}>Editar Tarea</button>
                        </div>
                    </form>
                </div>}
            </div>
        </div>

    );
}
