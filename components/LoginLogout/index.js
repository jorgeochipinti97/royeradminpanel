import React, { useEffect } from 'react'
import NextLink from 'next/link';
import { Link, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';

export const LoginLogout = () => {
    const { error, isLoading, user } = useUser()


    return (
        <>
            {!user ? (
                <NextLink href='/api/auth/login' passHref>

                        <Button color={'primary'}>Login</Button>

                </NextLink>
            )
                : (
                    <NextLink href='/api/auth/logout' passHref>

                            <Button color={'primary'}>Logout</Button>

                    </NextLink>
                )
            }
        </>
    )
}
