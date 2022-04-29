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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow100.js';

import styles from './table-head-cell.css.js';
import arrowStyles from '@spectrum-web-components/icon/src/spectrum-icon-arrow.css.js';

export type SortedEventDetails = {
    sorted: 'asc' | 'desc';
    sortBy: string;
};

const ariaSortValue = (sorted?: 'asc' | 'desc'): string => {
    const values = {
        asc: 'ascending',
        desc: 'descending',
    };
    return values[sorted as 'asc' | 'desc'] || 'none';
};

/**
 * @element sp-table
 */
export class TableHeadCell extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles, arrowStyles];
    }

    @property({ reflect: true })
    public role = 'columnheader';

    @property({ type: Boolean, reflect: true })
    public sortable = false;

    @property({ reflect: true })
    public sorted: 'asc' | 'desc' | undefined;

    @property()
    public sortBy = '';

    @property({ type: Number, reflect: true })
    public tabIndex = -1;

    protected render(): TemplateResult {
        const visiblySorted = this.sortable && !!this.sorted;
        return html`
            <slot></slot>
            ${visiblySorted
                ? html`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `
                : html``}
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('click', () => {
            if (!this.sortable) return;
            if (this.sorted) {
                this.sorted = this.sorted === 'asc' ? 'desc' : 'asc';
            } else {
                this.sorted = 'asc';
            }
            this.dispatchEvent(
                new CustomEvent<SortedEventDetails>('sorted', {
                    bubbles: true,
                    detail: {
                        sorted: this.sorted,
                        sortBy: this.sortBy,
                    },
                })
            );
        });
    }

    protected update(changes: PropertyValues): void {
        if (changes.has('sorted')) {
            this.setAttribute('aria-sort', ariaSortValue(this.sorted));
        }
        if (changes.has('sortable')) {
            this.tabIndex = this.sortable ? 0 : -1;
        }
        super.update(changes);
    }
}
