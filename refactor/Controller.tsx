
import * as Toolbar from '@radix-ui/react-toolbar';

export default function Controller(){

  return (
    <Toolbar.Root
      className="flex p-[10px] w-full min-w-max rounded-md bg-white shadow-[0_2px_10px] shadow-blackA7"
      aria-label="Formatting options"
    >
    <Toolbar.ToggleGroup type="single">
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="bold"
      >

      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="italic"
      >

      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
        value="strikethrough"
      >

      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  </Toolbar.Root>
  )
};

