import { ModalProps } from "./modal.types";
import styles from "./modal.module.css"
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal(props: ModalProps){
    const {
        isOpen, 
        className, 
        children, 
        isClickOutsideDoClose = false, 
        container = document.body,
        onClose, 
    } = props

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect( () => {
        function handleClick(event: MouseEvent) {
            if (!isClickOutsideDoClose || !onClose || !modalRef.current) return
            const target = event.target as HTMLElement
            console.log(target)
            if (!modalRef.current.contains(target)) {
                console.log('Close')
                onClose()
            }
        }
        document.body.addEventListener('click', handleClick)
        
        // Cleanup
        return () => {
            document.body.removeEventListener('click', handleClick)
        }
    }, [])

    if(!isOpen){
        return null
    }
    // createPortal - функция, которая позволяет отобразить контент в указанном контейнере(HTML элементе)
    return createPortal(<div className = {`${styles.modal} ${className}`} ref={modalRef}>
        {children}
    </div>, container)
}
