
import * as Toolbar from '@radix-ui/react-toolbar';
import style from './Controller.module.css'

export default function Controller(){

  return (
    <Toolbar.Root className={style.ToolbarRoot}>
      <Toolbar.ToggleGroup type='single'>
        <Toolbar.ToggleItem 
          value='bold' 
          className={style.ToolbarToggleItem}

        >
          selector
        </Toolbar.ToggleItem >
        <Toolbar.Separator className={style.ToolbarSeparator}/>
        <Toolbar.ToggleItem 
          value='bold' 
          className={style.ToolbarToggleItem}

        >
          drawer
        </Toolbar.ToggleItem>
        <Toolbar.Separator className={style.ToolbarSeparator}/>
        <Toolbar.ToggleItem 
          value='bold' 
          className={style.ToolbarToggleItem}

        >
          editor
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  )
};

