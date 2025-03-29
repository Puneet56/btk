import * as SelectPrimitive from "@radix-ui/react-select";

import {
  ChangeEvent,
  Children,
  ComponentProps,
  ReactElement,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: "sm" | "default";
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}


function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
			{...props}
		/>
	);
}

function  SelectContent({
    className,
    children,
    position = "popper",
    ...props
  }: ComponentProps<typeof SelectPrimitive.Content>) {
    const [search, setSearch] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
  
    // Memoized filtered children
    const filteredChildren = useMemo(() => {
      const filtered = Children.toArray(children).filter(
        child =>
          isValidElement(child) &&
          child.props.children?.toLowerCase().includes(search.toLowerCase())
      );
  
      // Ensure selected value remains visible even if search filters it out
      if (selectedValue) {
        const selectedOption = Children.toArray(children).find(
          child => isValidElement(child) && child.props.value === selectedValue
        );
  
        if (selectedOption && !filtered.includes(selectedOption)) {
          filtered.unshift(selectedOption);
        }
      }
      return filtered;
    }, [children, search, selectedValue]);
  
    // Restore focus on input after list changes
    useEffect(() => {
      setTimeout(() => inputRef.current?.focus(), 0);
    }, [search]);
  
    // Handle Search Input
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    // Clear search and preserve selected value
    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setSearch(""); // Reset search to show full list
      setTimeout(() => inputRef.current?.focus(), 0);
    };
  
    // Handle dropdown open/close state
  
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-content"
          className={cn(
            "bg-popover text-popover-foreground relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          position={position}
          onEscapeKeyDown={() => {
            setSearch("");
          }} // Close on escape
          onPointerDownOutside={() => {
            setSearch("");
          }} // Close on outside click
          {...props}>
          {/* Search Input */}
          <div className="relative p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-3 py-1.5 text-sm bg-white border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onPointerDown={e => e.stopPropagation()} // Prevent dropdown close
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-3 text-gray-500 hover:text-gray-800">
                <X size={16} />
              </button>
            )}
          </div>
  
          <SelectScrollUpButton />
  
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            )}>
            {/* Render filtered options */}
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child, index) =>
                cloneElement(child as ReactElement, {
                  key: index,
                  onClick: (e: any) => {
                    e.preventDefault(); // Prevent dropdown from closing
                    handleSelect(child.props.value);
                  }
                })
              )
            ) : // Ensure selected value remains visible even when search is empty
            selectedValue ? (
              <div className="p-2 text-sm font-medium text-gray-700">
                {Children.toArray(children).find(
                  child =>
                    isValidElement(child) && child.props.value === selectedValue
                )?.props.children || "No options found"}
              </div>
            ) : (
              <div className="p-2 text-sm text-gray-500">No options found</div>
            )}
          </SelectPrimitive.Viewport>
  
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
    SelectContent
};
