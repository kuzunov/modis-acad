import TextField, { TextFieldPropsSizeOverrides } from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import React from "react";

interface FormInputTextProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    control: Control<TFieldValues, any>;
    label: string;
    rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    disabled?: boolean;
    password?:boolean;
    size?: 'small' | 'medium';
    error?: string | undefined;
}


function FormInputText<TFieldValues extends FieldValues>(
    { name, control, label, rules = {}, disabled = false, size = 'medium', error=undefined, password = false}: FormInputTextProps<TFieldValues>) {
    return (
        (
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <TextField label={label} disabled={disabled} size={size} error={!!error} type={password?"password":""}
                     helperText={error || ''} {...field} />
                }
                rules={rules}
            />
        )
    )
}

export default FormInputText