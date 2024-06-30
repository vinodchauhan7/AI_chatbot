import Section from '@/components/section-label'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type BotNameProps = {
  bot_name: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const BotName = ({
  bot_name,
  register,
  errors,
}: BotNameProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        label="Bot Name"
        message="Customize your Bot Name"
      />
      <div className="lg:w-[500px] pl-2">
        <FormGenerator
          placeholder={bot_name}
          inputType="input"
          lines={2}
          register={register}
          errors={errors}
          name="bot_name"
          type="text"
        />
      </div>
    </div>
  )
}

export default BotName
