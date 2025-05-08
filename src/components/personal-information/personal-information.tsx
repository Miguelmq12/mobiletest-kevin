import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles  from './personal-information.module.css';
import stylesglobal  from './personal-information.module.css';
import {
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
  FaFileUpload,
  FaCamera,
} from 'react-icons/fa';
import Compress from 'compress.js';
import { useNavigate } from 'react-router-dom';
import Capture from '../capture/capture';
import BottomActions from '../shared/bottom-actions/bottom-actions';
import Layout from '../layout/layout';

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const maxFileSize = 2 * 1024 * 1024; // 2 MB

  const [ssn, setSsn] = useState<string>('');
  const [showSsn, setShowSsn] = useState<boolean>(false);

  const toggleShowSsn = () => {
    setShowSsn(!showSsn);
  };

  const formattedSsn = ssn.replace(/\d/g, '*');

  const handleSsnChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/[^\d\-]/g, '');
    if (value.length > 3 && value[3] !== '-') {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    if (value.length > 6 && value[6] !== '-') {
      value = value.slice(0, 6) + '-' + value.slice(6);
    }
    setSsn(value);
  };

  const handleCapture = (imageSrc: string) => {
    setImage(imageSrc);
    setShowCamera(false);
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleExit = () => {
    navigate('/progress-checklist');
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const fileType = selectedFile.type;
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/bmp',
        'image/tiff',
        'image/heif',
        'image/heic',
      ];

      if (validImageTypes.includes(fileType)) {
        if (selectedFile.size > maxFileSize) {
          alert(
            'El archivo es demasiado grande. El tamaño máximo permitido es 2 MB.'
          );
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert('Por favor, seleccione un archivo de imagen válido.');
      }
    }
  };

  const compressImage = (imageFile: File): Promise<string> => {
    const compress = new Compress();
    return new Promise((resolve, reject) => {
      compress
        .compress([imageFile], {
          size: 2,
          quality: 0.75,
          maxWidth: 1024,
          maxHeight: 1024,
          resize: true,
        })
        .then((compressedImages: any) => {
          const compressedImage = compressedImages[0];
          resolve(compressedImage.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const handleSubmit = () => {
    if (image || selectedImage) {
      const isValidImage = (image || selectedImage)?.startsWith('data:image/');
      if (isValidImage) {
        const file = selectedImage ? selectedImage : image;
        const img = new Image();
        img.onload = () => {
          const fileSize = Math.round(file!.length * 0.75);
          if (fileSize > maxFileSize) {
            alert(
              'El archivo de imagen es demasiado grande. El tamaño máximo permitido es 10KB.'
            );
          } else {
            const binaryData = image || selectedImage;
            console.log('Imagen en formato binario:', binaryData);
          }
        };
        img.src = isValidImage ? file! : '';
      } else {
        alert('El archivo seleccionado no es una imagen válida.');
      }
    } else {
      alert('Por favor, cargue una imagen antes de enviar.');
    }
  };

  const [activeTab2, setActiveTab2] = useState('Opcion1');
  const handleTabClick = (tabName: any) => {
    setActiveTab2(tabName);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadBoxClick = () => {
    if (activeTab2 === 'Opcion1') {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else if (activeTab2 === 'Opcion2') {
      setShowCamera(true);
    }
  };

  return (

    <Layout title="Personal Information" onExit={handleExit} onSubmit={handleSubmit}>
       <div className={styles.container_generic} style={{marginBottom: showCamera ? '0px' : '70px', }} >
      <>
        {showCamera ? (
          <Capture onCapture={handleCapture} onClose={handleCloseCamera} />
        ) : (
          <>
            <h1 className="title">Personal Information</h1>
            <h5 className="subtitle">Stephen Jones</h5>
            <h5 className="message">
              123 Main Street, Anytown, USA 90210
              <br />
              (555) 867-5309, sjones@gmail.com
            </h5>
            <p className="message small">
              (contact HR if any of this information is incorrect)
            </p>
            <div className='separationLine'></div>

            <div className="input-table">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="dob">Enter Date of Birth</label>
                    </td>
                    <td>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="input-field"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='separationLine'></div>
            <br></br>
            <div className="upload-container">
              <div className="tab-header">
                <button
                  className={`tab ${activeTab2 === 'Opcion1' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Opcion1')}
                >
                  Upload
                </button>
                <button
                  className={`tab ${activeTab2 === 'Opcion2' ? 'active' : ''}`}
                  onClick={() => handleTabClick('Opcion2')}
                >
                  Capture
                </button>
              </div>
              <div className="upload-box" onClick={handleUploadBoxClick}>
                {activeTab2 === 'Opcion1' ? (
                  <>
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                      />
                    ) : (
                      <>
                        <div className="upload-icon">
                          <FaFileUpload
                            style={{
                              fontSize: '45px',
                              cursor: 'pointer',
                              color: '#4472C4',
                            }}
                          />
                        </div>
                        <p>Select image file</p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {image ? (

                      <img
                        src={image}
                        alt="Captured"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '5px',
                        }}
                      />
                    ) : (
                      <>
                        <div className="upload-icon">
                          <FaCamera
                            style={{
                              fontSize: '45px',
                              cursor: 'pointer',
                              color: '#4472C4',
                            }}
                          />
                        </div>
                        <p>Take a picture</p>
                      </>
                    )}
                  </>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

          </>
        )}
      </>
    </div>
    </Layout>
  

  );
};

export default PersonalInformation;
