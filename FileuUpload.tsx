import { AttachmentIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, InputProps, useMultiStyleConfig } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useController, UseControllerProps } from 'react-hook-form';


interface FormValues {
  file: File
}


export const FileInput = (props: InputProps) => {
  const styles = useMultiStyleConfig("Button", { variant: "outline" });

  return (
    <Input
      type="file"
      sx={{
        "::file-selector-button": {
          border: "none",
          outline: "none",
          mr: 2,
          ...styles,
        },
      }}
      {...props}
    />
  );
};

// export default function FileUpload(props: UseControllerProps<FormValues>) {

//   const inputRef = useRef<HTMLInputElement>(null)
//   const { field: {ref, value, onChange, ...inputProps}} = useController(props);

//   return (
//     <InputGroup>
//       <InputLeftElement
//         pointerEvents="none">
//         <AttachmentIcon/>
//       </InputLeftElement>
//       <input 
//         type='file'
//         style={{display: 'none'}}
//         ref={inputRef}
//         onChange={(evt)=>evt.target.files && onChange(evt.target.files[0])}
//         {...inputProps} 
//       />
//       <Input
//         value={value.name}
//         placeholder={"Your file ..."}
//         onClick={() => inputRef.current?.click()}
//         readOnly
//       />
//     </InputGroup>  
//   )
// }
