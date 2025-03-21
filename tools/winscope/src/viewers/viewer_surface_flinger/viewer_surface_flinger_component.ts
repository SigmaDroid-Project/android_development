/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TRACE_INFO} from 'app/trace_info';
import {PersistentStore} from 'common/persistent_store';
import {TraceType} from 'trace/trace_type';
import {UiData} from './ui_data';

@Component({
  selector: 'viewer-surface-flinger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card-grid">
      <rects-view
        class="rects-view"
        title="Layers"
        [rects]="inputData?.rects ?? []"
        [highlightedItem]="inputData?.highlightedItem ?? ''"
        [displayIds]="inputData?.displayIds ?? []"></rects-view>
      <mat-divider [vertical]="true"></mat-divider>
      <hierarchy-view
        class="hierarchy-view"
        [tree]="inputData?.tree ?? null"
        [dependencies]="inputData?.dependencies ?? []"
        [highlightedItem]="inputData?.highlightedItem ?? ''"
        [pinnedItems]="inputData?.pinnedItems ?? []"
        [store]="store"
        [userOptions]="inputData?.hierarchyUserOptions ?? {}"></hierarchy-view>
      <mat-divider [vertical]="true"></mat-divider>
      <properties-view
        class="properties-view"
        [userOptions]="inputData?.propertiesUserOptions ?? {}"
        [propertiesTree]="inputData?.propertiesTree ?? {}"
        [highlightedProperty]="inputData?.highlightedProperty ?? ''"
        [selectedItem]="inputData?.selectedLayer ?? {}"
        [traceType]="${TraceType.SURFACE_FLINGER}"
        [displayPropertyGroups]="inputData?.displayPropertyGroups"
        [isProtoDump]="true"></properties-view>
    </div>
  `,
  styles: [
    `
      .rects-view,
      .hierarchy-view,
      .properties-view {
        flex: 1;
        padding: 16px;
        display: flex;
        flex-direction: column;
        overflow: auto;
      }
    `,
  ],
})
export class ViewerSurfaceFlingerComponent {
  @Input() inputData?: UiData;
  @Input() store: PersistentStore = new PersistentStore();
  @Input() active = false;
  TRACE_INFO = TRACE_INFO;
  TraceType = TraceType;
}
