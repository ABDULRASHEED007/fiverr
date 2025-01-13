import React from 'react'
// import { Home, ChevronRight } from 'lucide-react'
import { GoHome } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa6";


import './BreadCrumbs.scss'

export default function BreadCrumbs() {
  return (
    <nav aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="#">
          <GoHome />
            Documentation
          </a>
        </li>
        <li>
          <div>
            <FaAngleRight />
            <a href="#">Application UI</a>
          </div>
        </li>
        <li aria-current="page">
          <div>
          <FaAngleRight />
            <span>Breadcrumbs</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
