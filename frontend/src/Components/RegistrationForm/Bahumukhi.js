import React, { useState, useContext } from 'react';
import NewContext from '../../context/NewContext';
import { toast } from 'react-toastify';

const url = process.env.REACT_APP_HOST || "http://localhost:8080"

const Bahumukhi = ({ formData, setFormData, onCloseModal, onOpenModal, handleChange }) => {

  const context = useContext(NewContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isRegistered = await context.checkRegistrationStatus('bahumukhi', window.localStorage.getItem("access_token"));

      if (isRegistered) toast.error('You have already registered for this event.');
      else onOpenModal();
  } catch (error) {
      console.error('Error checking registration status:', error);
  }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className='infoDiv'>
          {/* Participant Name */}
          <label htmlFor='participantName'>Participant Name</label>
          <input type="text" id='participantName' name="participantName" required placeholder="Participant Name" value={formData?.participantName} className="input" onChange={handleChange} />
        </div>
        {/* Institute Name */}
        <div className='infoDiv'>
          <label htmlFor='instituteName'>Institute Name</label>
          <input type="text" id='instituteName' name="instituteName" required placeholder="Institute Name" value={formData?.instituteName} className="input" onChange={handleChange} />
        </div>
        {/* Script Submission */}
        <div className='infoDiv'>
          <label className='withtooltip' htmlFor='script_link'>Script Submission<i className="fa-solid fa-circle-info tooltip"> <span className="tooltiptext">Upload the script to the drive, allow access to anyone with the link, and paste the link here.</span></i></label>
          <input type="url" id='script_link' name="script_link" required placeholder="paste file link" value={formData?.script_link} className="input" onChange={handleChange} />
        </div>
        {/* Video Submission */}
        <div className='infoDiv'>
          <label className='withtooltip' htmlFor='vid_link'>Video Submission<i className="fa-solid fa-circle-info tooltip"> <span className="tooltiptext">Upload the video to the drive, allow access to anyone with the link, and paste the link here.</span></i></label>
          <input type="url" id='vid_link' name="vid_link" required placeholder="paste file link" value={formData?.vid_link} className="input" onChange={handleChange} />
        </div>
        {/* Payment link*/}
        {/* <div className='infoDiv'>
          <label className='withtooltip' htmlFor='payment_link'>Payment Link<i className="fa-solid fa-circle-info tooltip"> <span className="tooltiptext">Upload the Payment proof to the drive, allow access to anyone with the link, and paste the link here.</span></i></label>
          <input type="url" id='payment_link' name="payment_link" required placeholder="paste link here" value={formData?.vid_link} className="input" onChange={handleChange} />
        </div> */}
        <button type="submit">Continue</button>
      </form>
    </>
  );
};

export default Bahumukhi;
