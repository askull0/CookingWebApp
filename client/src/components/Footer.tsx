import {Anchor, Group, ActionIcon, rem} from '@mantine/core';
import {IconBrandTwitter, IconBrandYoutube, IconBrandInstagram} from '@tabler/icons-react';
import classes from '../FooterCentered.module.css';
import logoImage from "../gnome-logo.png";

const links = [
    {link: '#', label: 'Contact'},
    {link: '#', label: 'Privacy'},
];
export const Footer = () => {
    /*    return (
            <div className="footer">
                Data
            </div>
        )*/
    const items = links.map((link) => (
        <Anchor
            c="dimmed"
            key={link.label}
            href={link.link}
            lh={1}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Group style={{alignItems: 'center'}}>
                    <img src={logoImage} alt="logo" className={classes.logo1}/>

                    <Group className={classes.links} style={{flex: 1}}>
                        {items}
                    </Group>

                    <Group gap="xs" justify="flex-end">
                        <ActionIcon size="lg" variant="default" radius="xl" style={{background: '#cef6da'}}>
                            <IconBrandTwitter style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                        <ActionIcon size="lg" variant="default" radius="xl" style={{background: '#cef6da'}}>
                            <IconBrandYoutube style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                        <ActionIcon size="lg" variant="default" radius="xl" style={{background: '#cef6da'}}>
                            <IconBrandInstagram style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                        </ActionIcon>
                    </Group>
                </Group>
            </div>
        </div>
    );
}