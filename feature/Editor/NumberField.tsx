import { NetworkAttributes } from "@/lib/graph";
import { 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper } from "@chakra-ui/react";
import { useController, UseControllerProps } from "react-hook-form";

export function NumberField({ name, control, rules, ...props }:UseControllerProps<NetworkAttributes>) {
  const {
    field: { ref, ...inputProps }
  } = useController({
    name: name,
    control,
    rules,
    defaultValue: ""
  });

  return (
    <NumberInput {...inputProps} {...props} max={10} min={1}>
      <NumberInputField ref={ref}/>
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}