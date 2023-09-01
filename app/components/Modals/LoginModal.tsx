'use client'
import {signIn} from 'next-auth/react'
import  { useState,useCallback } from 'react'
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { toast } from "react-hot-toast";
import {useRouter} from 'next/navigation'
import { FieldValues, SubmitHandler,useForm
} from "react-hook-form";
import useLoginModal from '@/app/hooks/useLoginModel';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Button from '../Button';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=> {
            setIsLoading(false);
            if (callback?.ok){
             toast.success("Login success");
             router.refresh
             loginModal.onClose();
               }
               if (callback?.error){
                toast.error(callback.error);
               }
            })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back ' subtitle='Login to your account'/>
            <Input id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required/>
             <Input id='password'
            label='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            type='password'
            required/>
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button outline label='Continue with Google' icon={FcGoogle} 
            onClick={() => signIn('google')}/>
            <Button outline label='Continue with Github' icon={AiFillGithub} 
            onClick={() => signIn('github')}/>
             <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <div>Already have an account?</div>
        
          <div
          onClick={registerModal.onClose}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "> Log in
          </div>
        </div>
        </div>
    )
 return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;