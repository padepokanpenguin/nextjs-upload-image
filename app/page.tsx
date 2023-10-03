'use client'
import React, { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File>()

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  if(!file) return
  
  try {
    const data = new FormData()
    data.set('file', file)
    console.log(data)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data
    })

    if (!response.ok) throw new Error(await response.text())
  } catch (error) {
    console.error(error)
  }
}

  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div >
        <form onSubmit={onSubmit}>
          <input type='file' onChange={(e) => setFile(e?.target?.files?.[0])} />
          <input type='submit' value='Upload' />
        </form>
      </div>
    </main>
  )
}
