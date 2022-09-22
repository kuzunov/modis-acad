import TextField, { TextFieldPropsSizeOverrides } from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import React from "react";
import InputLabel from '@mui/material/InputLabel/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import FormControl from '@mui/material/FormControl/FormControl';

interface FormInputSelectProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    control: Control<TFieldValues, any>;
    label: string;
    options: SelectOption[];
    defaultOptionIndex:number;
    rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    disabled?: boolean;
    size?: 'small' | 'medium';
    error?: string | undefined;

}
export type SelectOption = {
    key: number;
    value: string;

}


function FormInputSelect<TFieldValues extends FieldValues>(
    { name, control, label, options = [], defaultOptionIndex = 0, rules = {}, disabled = false, size = 'medium', error=undefined}: FormInputSelectProps<TFieldValues>) {
    return (
        (
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                <FormControl><InputLabel id="post-status-label">Post status</InputLabel>
                <Select
                        labelId="post-status-label"
                        id="demo-simple-select"
                        label={label}
                        defaultValue={options[defaultOptionIndex]}
                        {...field}
                    >
                        {options.map((option,index)=> (<MenuItem key = {option.key} value={option.key} >{option.value}</MenuItem>))}
                    </Select></FormControl>
                }
                rules={rules}
            />
        )
    )
}

export default FormInputSelect