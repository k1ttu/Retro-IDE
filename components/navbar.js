'use client'
import 'animate.css'
import Link from "next/link"
import Image from "next/image"
import Logo from './logo.png'
import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { Listbox, Switch, Transition } from "@headlessui/react";

export default function Navbar() {
    let cursor = "";

    return (
        <nav className="flex flex-row justify-start z-10 border-b align-middle items-center border-b-gray-800 px-6 bg-black/20 backdrop-blur-lg">
            <Link className="flex justify-start align-middle" href={"#"}>
                <Image src={Logo} className=" h-14 w-14" alt={''} />
                <p className={"flex flex-col justify-start dark:text-white text-black align-middle my-2 font-mono text-sm" + cursor}>
                    <span>
                        IDK why we
                    </span>
                    <span>
                        Have this logo<span className={"animate__animated animate__flash animate__infinite animate__"}>|</span>
                    </span>
                </p>

            </Link>

            
        </nav>
    )
}