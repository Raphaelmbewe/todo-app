/* eslint-disable react/prop-types */
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Container = ({ className, ...props }) => {
  return (
    <div
      className={classNames('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}

export default Container;