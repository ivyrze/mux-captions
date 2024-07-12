'use client';

import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalContent, ModalOverlay, Button, Input, useDisclosure } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { PiGear } from "react-icons/pi";
import styles from "../styles/components/SettingsDialog.module.css";

export const SettingsDialog = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [ tokenId, setTokenId ] = useState("");
    const [ tokenSecret, setTokenSecret ] = useState("");

    useEffect(() => {
        setTokenId(localStorage.getItem("tokenId") ?? "");
        setTokenSecret(localStorage.getItem("tokenSecret") ?? "");
    }, []);

    const saveSettings = () => {
        localStorage.setItem("tokenId", tokenId);
        localStorage.setItem("tokenSecret", tokenSecret);
        onClose();
    };

    const resetSettings = () => {
        localStorage.clear();
    };

    return (
        <>
            <Button variant="ghost" aria-label="Settings" onClick={ onOpen }>
                <PiGear />
            </Button>
            <Modal
                isOpen={ isOpen }
                onClose={ onClose }
            >
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Settings
                        </ModalHeader>

                        <ModalBody>
                            <p>
                                To create a new access token, visit the <Link href="https://dashboard.mux.com/settings/access-tokens" target="_blank" rel="noopener noreferrer">Mux dashboard</Link>. Your credentials will be stored locally across sessions.
                            </p>

                            <div className={ styles['settings-dialog__form'] }>
                                <label htmlFor="token-id">
                                    Token ID
                                </label>
                                <Input
                                    id="token-id"
                                    value={ tokenId }
                                    onChange={ event => setTokenId(event.target.value) }
                                    required
                                />
                                <label htmlFor="token-secret">
                                    Token secret
                                </label>
                                <Input
                                    id="token-secret"
                                    value={ tokenSecret }
                                    onChange={ event => setTokenSecret(event.target.value) }
                                    required
                                />
                            </div>
                        </ModalBody>

                        <ModalFooter className={ styles['settings-dialog__footer'] }>
                            <Button onClick={ saveSettings }>
                                Done
                            </Button>
                            <Button onClick={ resetSettings } colorScheme="gray">
                                Reset
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
};

export default SettingsDialog;