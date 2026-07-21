import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-features-edit',
  imports: [],
  templateUrl: './featuresEdit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesEdit {




  featureName = input<string>('');
  featureValues = input<string[]>([]);



}
