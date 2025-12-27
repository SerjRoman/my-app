import { ModalProps } from "./modal.types";
import styles from "./modal.module.css"
import { useEffect, useRef } from "react";




export function Modal(props: ModalProps){
    const {isOpen, className, children, isClickOutsideDoClose} = props
    
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect( () => {
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLElement
            if (!modalRef.current) return
            if (!modalRef.current.contains(target)) {
                console.log('Close')
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

    if(isClickOutsideDoClose){
        
    }

    return <div className = {`${styles.modal} ${className}`} ref={modalRef}>
        {children}
    </div>
}
