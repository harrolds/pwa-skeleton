/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import type { PanelType } from '../core/panels/PanelHost';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';

export type PanelRegistryEntry = {
  id: string;
  type: PanelType;
  component: React.ComponentType<any>;
};

const DemoSettingsPanel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <Card>
      <div className="settings-section">
        <h3 className="settings-layout__section-title">Demo panel</h3>
        <p className="settings-layout__description">Dit is een voorbeeldpaneel uit de registry.</p>
        <div className="settings-actions">
          <Button type="button" onClick={onClose}>
            Sluiten
          </Button>
        </div>
      </div>
    </Card>
  );
};

const HeaderActionsDemoPanel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <Card>
      <div className="settings-section">
        <h3 className="settings-layout__section-title">Header actions demo</h3>
        <p className="settings-layout__description">
          Dit bottom-sheet paneel is geopend via een declaratieve header-actie.
        </p>
        <div className="settings-actions">
          <Button type="button" onClick={onClose}>
            Sluiten
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const panelRegistry: PanelRegistryEntry[] = [
  { id: 'demo-settings', type: 'left', component: DemoSettingsPanel },
  { id: 'demo-settings', type: 'bottom', component: DemoSettingsPanel },
  { id: 'notes-header-actions-demo', type: 'bottom', component: HeaderActionsDemoPanel },
];
