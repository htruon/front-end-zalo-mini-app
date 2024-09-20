import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserID } from "zmp-sdk/apis";
import { getPhoneNumber } from "zmp-sdk/apis";

function LinkPhonePage() {
  const navigate = useNavigate();

  useEffect(() => {
    getZaloIdFromQRCode()
      .then((zaloId) => {
        // Check if the user has already linked their phone number
        axios.get(`/api/user/check-permission/${zaloId}`)
          .then(response => {
            if (response.data) {
              // Redirect to Home page
              navigate('/home');
            } else {
              // Request permission to link phone number
              requestPhonePermission(zaloId);
            }
          });
      })
      .catch(error => {
        console.error('Error fetching Zalo ID', error);
      });
  }, [navigate]);

  const getZaloIdFromQRCode = async () => {
    // Using Zalo Mini App API to get user ID
    const result = await getUserID();
    return result.userID;  // Extracting userID from the result
  };

  const requestPhonePermission = (zaloId) => {
    getPhoneNumber()
      .then(phoneData => {
        const phoneNumber = phoneData.phoneNumber;
        // Save to database
        axios.post('http://localhost:5000/api/user/link-phone', { zaloId, phoneNumber })
          .then(() => {
            navigate('/home');
          });
      })
      .catch(error => {
        console.error('Permission denied or error', error);
      });
  };

  return (
    <div>
      <h2>Linking your phone number...</h2>
    </div>
  );
}

export default LinkPhonePage;