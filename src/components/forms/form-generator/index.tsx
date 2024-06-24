import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    type: 'text' | 'email' | 'password'
    inputType: 'select' | 'input' | 'textarea'
    options?: {value: string; label: string; id: string}[]
    label?: string
    placeholder: string
    register: UseFormRegister<any>
    errors: FieldErrors<FieldValues>
    name: string
    lines?: number
    form?: string
    defaultValue?: string
}

const FormGenerator = ({
    type,
    inputType,
    options,
    label,
    placeholder,
    register,
    errors,
    name,
    lines,
    form,
    defaultValue
} : Props) => {
    switch(inputType) {
        case 'input':
        default:
            return (
                <Label
                    className='flex flex-col gap-2'
                    htmlFor={`input-${label}`}
                >
                    {label && label}
                    <Input 
                        id={`input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        {...register(name)}
                        form={form}
                        defaultValue={defaultValue}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({message}: any) => (
                            <p className='text-red-400 mt-sm'>
                                {message === 'Required' ? '' : message}
                            </p>
                        )}
                    />
                </Label>
            )
            case 'select':
                return (
                  <Label htmlFor={`select-${label}`}>
                    {label && label}
                    <select
                      form={form}
                      id={`select-${label}`}
                      {...register(name)}
                    >
                      {options?.length &&
                        options.map((option) => (
                          <option
                            value={option.value}
                            key={option.id}
                          >
                            {option.label}
                          </option>
                        ))}
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name={name}
                      render={({ message }: any) => (
                        <p className="text-red-400 mt-2">
                          {message === 'Required' ? '' : message}
                        </p>
                      )}
                    />
                  </Label>
                )
              case 'textarea':
                return (
                  <Label
                    className="flex flex-col gap-2"
                    htmlFor={`input-${label}`}
                  >
                    {label && label}
                    <Textarea
                      form={form}
                      id={`input-${label}`}
                      placeholder={placeholder}
                      {...register(name)}
                      rows={lines}
                      defaultValue={defaultValue}
                    />
                    <ErrorMessage
                      errors={errors}
                      name={name}
                      render={({ message }: any) => (
                        <p className="text-red-400 mt-2">
                          {message === 'Required' ? '' : message}
                        </p>
                      )}
                    />
                  </Label>
                )
    }
    return (
        <></>
    )
}

export default FormGenerator