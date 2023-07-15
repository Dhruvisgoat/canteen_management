import React from 'react'
import {
    CCard,
    CCardBody,
    CCardTitle,
    CCardSubtitle,
    CCardText,
    CCardLink
} from '@coreui/react'

function Card() {
    return (
        <div >
            <div className='mt-3'
                style={{
                    textAlign: 'center',
                    border:'1px solid black',
                }}>
                Today's Stats
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                <CCard style={{ width: '17rem', backgroundColor: '#d1c4e9', color: 'black' }} className='mt-4 mx-2'>
                    <CCardBody>
                        <h1>19</h1>
                        <h6>Total Customers</h6>
                        <CCardLink href="/">All time</CCardLink>
                        <CCardLink href="#">Choose Date</CCardLink>
                    </CCardBody>
                </CCard>
                <CCard style={{ width: '17rem', backgroundColor: '#c5cae9', color: 'black' }} className='mt-4 mx-2'>
                    <CCardBody>
                        <h1>44,000$</h1>
                        <h6>Total Revenue</h6>
                        <CCardLink href="/">All time</CCardLink>
                        <CCardLink href="#">Choose Date</CCardLink>
                    </CCardBody>
                </CCard>
                <CCard style={{ width: '17rem', backgroundColor: '#b2dfdb', color: 'black' }} className='mt-4 mx-2'>
                    <CCardBody>
                        <h1>11</h1>
                        <h6>Total Invoices</h6>
                        <CCardLink href="/">All time</CCardLink>
                        <CCardLink href="#">Choose Date</CCardLink>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    )
}

export default Card