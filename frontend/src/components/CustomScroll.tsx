import * as ScrollArea from '@radix-ui/react-scroll-area';

interface Props {
  children: JSX.Element | JSX.Element[]
  maxHeight: string;
}

export const CustomScroll = ({ children, maxHeight }: Props) => {
    return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className={`max-h-[${maxHeight}]`}>
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar className="p-1 bg-slate-200 transition-all ease-out duration-150" orientation="vertical">
        <ScrollArea.Thumb 
          className="
            flex-1 
            bg-slate-400 
            rounded 
            relative
            before:absolute
            before:top-1/2
            before:left-1/2
            before: translate-x-1/2
            before: translate-y-1/2
            before: w-full
            before: h-full
            before: min-h-[5px]
            before: min-w-[5px]
          "
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
    );
};