import React, { useState } from 'react';
import { Grid, IconButton, Drawer ,Button} from '@mui/material';
import { Resizable } from 'react-resizable';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GraphComponent from '../view/relationgraph/relationGraph';
import ChatToLLMComponent from '../view/chattollm/chatToLLM';
import ConfirmDialog  from './confirmDialog';
import UseConfirmDialog  from './useConfirmDialog';


const Layout = () => {
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [rightPanelWidth, setRightPanelWidth] = useState(800); // 默认宽度

  const {
    open,
    title,
    message,
    handleConfirm,
    handleCancel,
    showConfirmDialog,
  } = UseConfirmDialog();


  const toggleRightPanel = () => {
    setShowRightPanel(!showRightPanel);
  };

  const deleteAndInit=() => {
    showConfirmDialog(
      '确认',
      '是否删除并初始化全部节点?',
      () => alert('Confirmed!')
    );
  };

  const onResize = (event, { size }) => {
    setRightPanelWidth(size.width);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ height: '100vh', overflow: 'hidden' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: '1 1 100%', height: '100%' }}>
              <GraphComponent />
            </div>
            <Drawer
              anchor="right"
              variant="persistent"
              open={showRightPanel}
              PaperProps={{
                style: { width: rightPanelWidth, height: '100%', overflow: 'hidden' }
              }}
            >
              <Resizable
                width={rightPanelWidth}
                height={0}
                onResize={onResize}
                resizeHandles={['w']}
              >
                <div style={{ width: rightPanelWidth, height: '100%', backgroundColor: '#e0e0e0', paddingTop: '16px', paddingBottom: '0px', overflow: 'hidden' }}>
                  <div style={{ width: rightPanelWidth, height: '40px',overflow: 'hidden',marginLeft:'10px'}}>
                    <Button  size="small" variant="outlined" color="error" onClick={deleteAndInit} >
                      删除并初始化全部节点
                    </Button>
                    <Button  size="small" variant="outlined" onClick={toggleRightPanel}  style={{ marginLeft:'30px'}} >
                      隐藏
                    </Button>
                  </div>
                  <div style={{ width: rightPanelWidth, height: 'calc(100% - 60px)',overflow: 'hidden' }}>
                    <ChatToLLMComponent />
                  </div>
                </div>
              </Resizable>
            </Drawer>
          </div>
        </Grid>
        {!showRightPanel && (
          <IconButton
            onClick={toggleRightPanel}
            style={{
              position: 'fixed',
              bottom: '40px',
              right: '20px',
              zIndex: 1000,
              borderRadius: '50%',
              border: '2px solid #87CEEB',
              backgroundColor: 'transparent',
              width: '40px',
              height: '40px',
            }}
          >
            <ArrowForwardIosIcon style={{ color: '#87CEEB', transform: 'rotate(180deg)' }} />
          </IconButton>
        )}
      </Grid>
       <ConfirmDialog
       open={open}
       title={title}
       message={message}
       onConfirm={handleConfirm}
       onCancel={handleCancel}
     />
     </>
  );
};

export default Layout;