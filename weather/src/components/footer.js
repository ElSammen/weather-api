import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


export default function MyFooter() {
    return (
      <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between h6-4 border-bottom mt-5'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>
  
          <div>
            <a href='www.facebook.com' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href='www.twitter.com' className='me-4 text-reset'>
              <MDBIcon fab icon="twitter" />
            </a>
            <a href='www.google.com' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a href='www.instagram.com' className='me-4 text-reset'>
              <MDBIcon fab icon="instagram" />
            </a>
            <a href='www.linkedin.com' className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href='www.github.com' className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
  
        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                  Contributors</h6>
                <h6>
                  <a href='https://github.com/JPDevAcc' className='text-reset'>
                    James Percival
                  </a>
                </h6>
                <h6>
                  <a href='https://github.com/ElSammen' className='text-reset'>
                    Liam Salmon
                  </a>
                </h6>
                <h6>
                  <a href='https://github.com/JamesMDesign' className='text-reset'>
                    James McDonald
                  </a>
                </h6>
                <h6>
                  <a href='Https://github.com/PeterAlexandru' className='text-reset'>
                    Peter Alexandru
                  </a>
                </h6>
                <h6>
                  <a href='Https://github.com/cjm-1992' className='text-reset'>
                    Connor Monaf
                  </a>
                </h6>
              </MDBCol>
  
              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Created With...</h6>
                <h6>
                  <a href='#!' className='text-reset'>
                    React
                  </a>
                </h6>
                <h6>
                  <a href='#!' className='text-reset'>
                    Bootstrap
                  </a>
                </h6>
                <h6>
                  <a href='#!' className='text-reset'>
                    MDBootstrap
                  </a>
                </h6>
                <h6>
                  <a href='#!' className='text-reset'>
                    Recharts
                  </a>
                </h6>
              </MDBCol>
  
              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Credits</h6>
                <h6>
                  <a href='https://freesound.org/people/abcopen/' className='text-reset'>
                    abcopen 
                  </a>
                </h6>
                <h6>
                  <a href='https://freesound.org/people/TheGloomWorker/' className='text-reset'>
                    TheGloomWorker
                  </a>
                </h6>
                <h6>
                  <a href='https://freesound.org/people/TJ%20Mothy/' className='text-reset'>
                    TJMothy
                  </a>
                </h6>                
              </MDBCol>
  
              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <h6>
                  <MDBIcon icon="home" className="me-3" /> Hey I just met you
                </h6>
                <h6>
                  <MDBIcon icon="envelope" className="me-3" /> anemail@example.com
                </h6>
                <h6>
                  <MDBIcon icon="arrow-down" className="me-3" /> And this is crazy
                </h6>
                <h6>
                  <MDBIcon icon="phone" className="me-3" /> But here's my number
                </h6>
                <h6>
                  <MDBIcon icon="print" className="me-3" /> So call me maybe
                </h6>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className='text-center h6-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2023 Copyright:
          <a className='text-reset fw-bold' href='https://thedeveloperacademy.com/'>
            The Developer Academy 
          </a>
        </div>
      </MDBFooter>
    );
  }