// Dialog.stories.js
import React, { useEffect, useState } from 'react';
import Dialog from '../components/Dialog/Dialog';
import { fn } from '@storybook/test';

export default {
    title: 'Dialog',
    component: Dialog,
};

const ModalRoot = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
        setIsMounted(true);

        return () => {
            document.body.removeChild(modalRoot);
        };
    }, []);

    return isMounted ? children: null;
};

export const Default = (args) => (
    <ModalRoot>
        <Dialog title={args.title} onClose={args.onClose}>
            {args.children}
        </Dialog>
    </ModalRoot>
);

Default.args = {
    title: 'Test Dialog',
    children: 'Message',
    onClose: fn()
}