import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export interface ButtonBaseProps {
	disablePadding?: boolean;
	size?: "small" | "medium" | "large" | "responsive";
	variant?: "create" | "edit" | "delete" | "submit";
	fullWidth?: boolean;
	group?: "left" | "right" | "middle";
}

export type ButtonProps = ButtonBaseProps &
	DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function buttonClasses(
	props: ButtonBaseProps & { disabled?: boolean; className?: string }
) {
	const {
		disablePadding,
		size,
		variant,
		fullWidth,
		disabled,
		className,
		group,
	} = props;
	return clsx(
		"duration-300 transition text-sm uppercase",
		{
			"rounded-xl": !group,
			"rounded-l-xl": group === "left",
			"rounded-r-xl": group === "right",
			"bg-stone-300 text-black border-none font-normal shadow-lg shadow-stone-400 hover:bg-stone-400 ":
				!disabled && variant === "create",

			"bg-gray-700 text-rose-100 border-none font-normal drop-shadow-[2px_2px_3px_rgb(130,65,101)] hover:bg-rose-200 hover:text-gray-700 ":
				!disabled && variant === "edit",

			"bg-rose-800 text-stone-100 drop-shadow-[2px_2px_3px_rgb(54,42,48)] font-normal hover:text-rose-700 hover:bg-stone-300 ":
				!disabled && variant === "delete",

			"bg-stone-100 text-black border-none font-normal shadow-lg hover:bg-stone-400 hover:text-white":
				!disabled && variant === "submit",

			"px-3 py-2": size === "medium" && !disablePadding,
			"px-2 py-1": size === "small" && !disablePadding,
			"px-4 py-2 xl:px-8 xl:px-4": size === "responsive" && !disablePadding,
			"block w-full": fullWidth,
		},
		className
	);
}

const Button = ({
	children,
	className,
	disabled = false,
	disablePadding = false,
	onClick,
	fullWidth,
	size = "small",
	variant = "create",
	type = "button",
	group,
	...props
}: ButtonProps) => {
	return (
		<button
			className={buttonClasses({
				className,
				disablePadding,
				disabled,
				size,
				fullWidth,
				variant,
				group,
			})}
			disabled={disabled}
			onClick={onClick}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
