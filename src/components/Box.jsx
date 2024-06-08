import React from 'react'

export default function Box({ title, icon: Icon, content, content1 }) {
  return (
    <div className="box">
      <h2>
        {Icon && <Icon />} {title}
      </h2>
      <p>{content}</p>
      <p>{content1}</p>
    </div>
  )
}
