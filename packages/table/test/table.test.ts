/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { expect, fixture } from '@open-wc/testing';

import '../sp-table.js';
import '../sp-table-head.js';
import '../sp-table-head-cell.js';
import '../sp-table-body.js';
import '../sp-table-row.js';
import '../sp-table-cell.js';
import { Table } from '../';
import { elements, virtualized } from '../stories/table.stories.js';
import { TableHeadCell } from '../src/TableHeadCell.js';
import { sendKeys } from '@web/test-runner-commands';

let globalErrorHandler: undefined | OnErrorEventHandler = undefined;
before(function () {
    // Save Mocha's handler.
    (
        Mocha as unknown as { process: { removeListener(name: string): void } }
    ).process.removeListener('uncaughtException');
    globalErrorHandler = window.onerror;
    addEventListener('error', (error) => {
        if (error.message?.match?.(/ResizeObserver loop limit exceeded/)) {
            return;
        } else {
            globalErrorHandler?.(error);
        }
    });
});
after(function () {
    window.onerror = globalErrorHandler as OnErrorEventHandler;
});

describe('Table', () => {
    it('loads default table accessibly', async () => {
        const el = await fixture<Table>(elements());
        await expect(el).to.be.accessible();
    });

    it('loads virtualized table accessibly', async () => {
        const el = await fixture<Table>(virtualized());
        await expect(el).to.be.accessible();
    });

    it('creates tab stops for `<sp-table-head-cell sortable>`', async () => {
        const input = document.createElement('input');
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        test.insertAdjacentElement('beforebegin', input);

        input.focus();
        expect(input === document.activeElement).to.be.true;

        const firstSortable = el.querySelector(
            '[sortable]:nth-of-type(1)'
        ) as TableHeadCell;
        const secondSortable = el.querySelector(
            '[sortable]:nth-of-type(2)'
        ) as TableHeadCell;

        await sendKeys({
            press: 'Tab',
        });
        expect(firstSortable === test.shadowRoot?.activeElement).to.be.true;

        await sendKeys({
            press: 'Tab',
        });
        expect(secondSortable === test.shadowRoot?.activeElement).to.be.true;
    });

    it('does not tab stop on `<sp-table-head-cell>`s', async () => {
        const input = document.createElement('input');
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        test.insertAdjacentElement('beforebegin', input);

        input.focus();
        expect(input === document.activeElement).to.be.true;

        const firstHeadCell = el.querySelector(
            'sp-table-head-cell:nth-of-type(1)'
        ) as TableHeadCell;
        const secondHeadCell = el.querySelector(
            'sp-table-head-cell:nth-of-type(2)'
        ) as TableHeadCell;
        const thirdHeadCell = el.querySelector(
            'sp-table-head-cell:nth-of-type(3)'
        ) as TableHeadCell;

        await sendKeys({
            press: 'Tab',
        });
        expect(firstHeadCell === test.shadowRoot?.activeElement).to.be.true;

        await sendKeys({
            press: 'Tab',
        });
        expect(secondHeadCell === test.shadowRoot?.activeElement).to.be.true;

        await sendKeys({
            press: 'Tab',
        });
        expect(thirdHeadCell === test.shadowRoot?.activeElement).to.be.false;
    });

    xit('can be focus()ed from the `<sp-table>`', async () => {
        const input = document.createElement('input');
        const test = await fixture<HTMLElement>(virtualized());
        const el = test.shadowRoot?.querySelector('sp-table') as Table;

        test.insertAdjacentElement('beforebegin', input);
        // we should be able to do el.focus()
        el.focus();
        // should focus the first sortable descendant
        const firstSortable = el.querySelector(
            '[sortable]:nth-of-type(1)'
        ) as TableHeadCell;

        expect(firstSortable === test.shadowRoot?.activeElement).to.be.true;
    });
});
