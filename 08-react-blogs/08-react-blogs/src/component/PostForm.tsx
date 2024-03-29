import React, { BaseSyntheticEvent, FormEvent } from 'react';
import { Post, PostCreateDto, PostStatus } from '../model/posts';
import { IdType, Optional, PostListener } from '../model/shared-types';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormInputText from './FormInputText';
import FormInputSelect, { SelectOption } from './FormInputSelect';


interface PostFormProps {
    post: Optional<Post>;
    onSubmitPost: PostListener;
}

type FormData = {
    id: number;
    title: string;
    content: string;
    tags: string;
    imageUrl: string;
    status: PostStatus;
    authorId: IdType;
};
// const EMPTY_POST = new Post(
//     "",
//     "",
//     [],
//     "",
//     1,

// );

const TAGS_PATTERN = /^\w{2,}([,\s]+\w{2,})*$/;
const POST_STATUS_SELECT_OPTIONS: SelectOption[] = Object.keys(PostStatus)
.filter(item=>!isNaN(Number(item)))
.map((ordinal:string) => parseInt(ordinal))
.map((ordinal:number)=>({key:ordinal, value:PostStatus[ordinal]}));

const schema = yup.object({
    id: yup.number().positive(),
    title: yup.string().required().min(2).max(40),
    content: yup.string().required().min(20).max(1024),
    tags: yup.string().required().matches(TAGS_PATTERN, 'tags should contain only letters, digits and spaces'),
    imageUrl: yup.string().required().url(),
    status: yup.number().min(1).max(2),
    authorId: yup.number().positive().required(),
  }).required();

export default function PostForm({ post, onSubmitPost }: PostFormProps) {
    const { control, register, setValue, handleSubmit, reset, formState: { errors,isDirty,isValid } } = useForm<FormData>({
        defaultValues: { ...post, tags: post?.tags.join(', ') },
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();
        const post = { ...data, tags: data.tags.split(/,\s*/) }
        onSubmitPost(post);
        reset()

    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        reset()
    }

    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#ddf',
                padding: '20px',
                '& .MuiButton-root': { m: 1, width: '25ch' },
                '& .MuiFormControl-root' : {m: 1, width: '100%'}
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)} onReset={onReset}
        >
            <FormInputText name='id' label='ID' control={control} disabled size='small' />
            <FormInputText name='title' label='Title' control={control} error={errors.title?.message}
            rules={{ required: true, minLength: 2, maxLength: 40 }} />
            <FormInputText name='content' label='Content' control={control} error={errors.content?.message}
            rules={{ required: true, minLength: 20, maxLength: 1024 }} />
            <FormInputText name='tags' label='Tags' control={control} error={errors.tags?.message}
            rules={{ pattern: TAGS_PATTERN }} />
            <FormInputText name='imageUrl' label='Image URL' control={control} error={errors.imageUrl?.message}
            rules={{ required: true }} />
            <FormInputText name='authorId' label='Author ID' control={control} error={errors.authorId?.message}
            rules={{ required: true }} />
            <FormInputSelect name = "status" label= "Status" control = {control} error={errors.status?.message}
            rules={{ required: true }} options = {POST_STATUS_SELECT_OPTIONS} defaultOptionIndex={1}/>
            <Button variant="contained" endIcon={<SendIcon />} type='submit' disabled={!(isDirty && isValid)}>
                Submit
            </Button>
            <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                Reset
            </Button>
        </Box>
    );
}
