import { generateDialogActions } from '@/services/tool/renderer/actions/dialog'

export class ToolService {
  public dialog = {
    actions: generateDialogActions(),
  }
}
