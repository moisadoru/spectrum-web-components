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
import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property /*queryAssignedNodes */,
} from '@spectrum-web-components/base/src/decorators.js';

import styles from './table.css.js';
import { TableHeadCell } from './TableHeadCell.js';
// import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

/**
 * @element sp-table
 */

export interface ChildCell {
    tableCell: TableHeadCell;
    focusable: boolean;
    focusRoot: Table;
}
export class Table extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    @property({ reflect: true })
    public role = 'grid';

    // @queryAssignedNodes()
    // private defaultNodes!: NodeListOf<TableHeadCell>;

    // private get headCells(): TableHeadCell[] {
    //     return [...(this.defaultNodes || [])].filter(
    //         (node: HTMLElement) => typeof node.tagName !== 'undefined'
    //     ) as TableHeadCell[];
    // }

    // private rovingTabIndexController = new RovingTabindexController<TableHeadCell>(
    //     this,
    //     {
    //         focusInIndex: (elements: TableHeadCell[]) => {
    //             return elements.findIndex((el) => {
    //                 return el.sortable;
    //             })
    //         },
    //         direction: 'grid',
    //         elements: () => this.headCells,
    //         isFocusableElement: (el: TableHeadCell) => el.sortable,
    //     }
    // );

    // public focus(): void {
    //     this.rovingTabIndexController.focus();
    // }

    // private handleSlotchange(): void {
    //     this.rovingTabIndexController.clearElementCache();
    // }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}
