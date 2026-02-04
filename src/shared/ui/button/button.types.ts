import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

/*

HTMLAttributes - атрибуты для всех тегов HTML(не учитываются специфические для <a></a>, <button></button>, input)

ButtonHTMLAttributes - атрибуты HTML тега <button></button>
InputHTMLAttributes - атрибуты HTML тега <input></input>

*/


export interface ButtonProps extends 
        DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant: "primary" | "secondary" | "submit"
}