/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { elementUpdated, expect, fixture } from '@open-wc/testing';

import '../sp-dialog.js';
import { Dialog } from '..';
import {
    alertError,
    dismissable,
    fullscreen,
    small,
} from '../stories/dialog.stories.js';
import { spy } from 'sinon';

describe('Dialog', () => {
    it('loads `[size=small]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(small());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `[size=alert]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(alertError());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `[dismissable]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(dismissable());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads `[mode=fullscreen]` dialog accessibly', async () => {
        const el = await fixture<Dialog>(fullscreen());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads dialog without footer accessibly', async () => {
        const el = await fixture<Dialog>(small());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('closes', async () => {
        const closeSpy = spy();
        const el = await fixture<Dialog>(dismissable());
        el.addEventListener('close', () => closeSpy());
        await elementUpdated(el);

        const closeButton = (
            el.shadowRoot
                ? el.shadowRoot.querySelector('.close-button')
                : el.querySelector('.close-button ')
        ) as HTMLElement;

        closeButton.click();

        await elementUpdated(el);
        expect(closeSpy.calledOnce).to.be.true;
    });
});
