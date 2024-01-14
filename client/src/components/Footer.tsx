import {Anchor, Group, ActionIcon, rem} from '@mantine/core';
import {IconBrandTelegram, IconBrandYoutube, IconBrandInstagram} from '@tabler/icons-react';
import classes from '../FooterCentered.module.css';
import logoImage from "../logo.png";

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
            c="white"
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
                        <ActionIcon size="lg" radius="xl" style={{background:"none"}}>
                            <IconBrandTelegram style={{width: rem(25), height: rem(25)}} />
                        </ActionIcon>
                        <ActionIcon size="lg" radius="xl" style={{background:"none"}}>
                            <IconBrandYoutube style={{width: rem(25), height: rem(25)}} />
                        </ActionIcon>
                        <ActionIcon size="lg"  radius="xl" style={{background:"none"}}>
                            <IconBrandInstagram style={{width: rem(25), height: rem(25)}}/>
                        </ActionIcon>
                    </Group>
                </Group>
            </div>
        </div>
    );
}