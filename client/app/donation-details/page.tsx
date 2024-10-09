"use client"
import React from 'react'
import { DonateDetails } from '@/src/components/DonateDetails'
import withAuth from '@/src/components/ProtectedRoute'

export const DonationDetailsPage = () => {
  return (
    <DonateDetails />
  )
}

export default withAuth(DonationDetailsPage)