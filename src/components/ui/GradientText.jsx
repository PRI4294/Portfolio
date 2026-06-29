export function GradientText({ children, className = '', as: Tag = 'span' }) {
  return <Tag className={`gradient-text ${className}`}>{children}</Tag>
}
