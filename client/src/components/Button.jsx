import { forwardRef } from 'react'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-5 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
  solid: {
    gray: 'bg-main_primary text-[#FFFFFF] hover:text-solid_secondary hover:bg-sub_primary active:bg-main_primary active:text-white/80',
  },
  outline: {
    gray: 'border-main_primary text-main_primary hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
  },
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Button = forwardRef(function Button(
  { variant = 'solid', color = 'gray', className, href, ...props },
  ref
) {
  className = classNames(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  )

  return href ? (
    <a ref={ref}  href={href} className={className} {...props} />
  ) : (
    <button ref={ref} className={className} {...props} />
  )
 })

