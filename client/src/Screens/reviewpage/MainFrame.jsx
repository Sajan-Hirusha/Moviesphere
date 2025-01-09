import React from 'react'
import './MainFrame.css'
export const MainFrame = () => {
  return (
    <>
    
    <div className="main-frame">
      <div className="photo-frame">
        <img src="photo1.jpg" alt="Photo 1" className="photo" />
      </div>
      <div className="video-frame">
        <video controls className="video">
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="photo-frame">
        <img src="photo2.jpg" alt="Photo 2" className="photo" />
      </div>
    </div>
    </>
  )
}
