import * as ScrollArea from '@radix-ui/react-scroll-area'
import React from 'react'

interface IProp {
  children?: React.ReactNode
}


export default function NetworkList({children}: IProp) {
  return (
    <ScrollArea.Root className="flex-auto basis-0 rounded overflow-hidden bg-white">
      <ScrollArea.Viewport className="w-full h-full rounded">
        <div className="py-[15px] px-5">
          {children}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar 
        className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5" 
        orientation="vertical"
      >
        <ScrollArea.Thumb 
          className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
        />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar 
        className="flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-blackA8" />
    </ScrollArea.Root>
  )
}
