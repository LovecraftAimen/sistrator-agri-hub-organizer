
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

interface CPFInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const CPFInput: React.FC<CPFInputProps> = ({
  value,
  onChange,
  placeholder = "000.000.000-00",
  disabled = false
}) => {
  const formatCPF = (cpf: string) => {
    // Remove tudo que não é dígito
    const numbers = cpf.replace(/\D/g, '');
    
    // Aplica a máscara
    return numbers
      .slice(0, 11) // Limita a 11 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={14}
    />
  );
};
