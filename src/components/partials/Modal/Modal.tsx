import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Modal.scss";
import {ModalData, ModalDataType} from "../../interfaces";

export interface ModalProps {
  isOpen: boolean;
  onClosed(): void;
  modalData: ModalData | undefined;
}

interface State {
  isOpen: boolean;
}

export class Modal extends React.Component<ModalProps, State> {
  public static readonly displayName = "Modal";

  constructor(props: ModalProps, context: any) {
    super(props, context);

    this.state = {
      isOpen: false
    };
  }

  public componentDidMount(): void {
    if(this.props.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  public componentWillReceiveProps(nextProps: ModalProps): void {
    console.log("nextProps", nextProps);

    if(nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  public render(): JSX.Element {
    return (
      <div className={this.state.isOpen ? "Modal" : "Modal Modal__closed"}>
        <div className={"Modal__inner"}>
          {this.props.modalData && this.props.modalData!.type === ModalDataType.list ? "Modal list add" : "Generic Modal"}

          <span
            onClick={() => {
            this.props.onClosed();
          }}>
            <FontAwesomeIcon
              icon="times"
              className={"Modal__close-btn"}
            />
          </span>
        </div>
      </div>
    );
  }
}