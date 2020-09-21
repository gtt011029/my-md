import rospy

from interactive_markers.interactive_marker_server import *
from visualization_msgs.msg import *
from geometry_msgs.msg import Point

def processFeedback(feedback):
    p = feedback.pose.position
    print (p)
    print (format(feedback))
    # print feedback.marker_name + " is now at " + str(p.x) + ", " + str(p.y) + ", " + str(p.z)


def makeBox( msg ):
    marker = Marker()

    marker.type = Marker.CUBE
    marker.scale.x = msg.scale * 0.45
    marker.scale.y = msg.scale * 0.45
    marker.scale.z = msg.scale * 0.45
    marker.color.r = 0.5
    marker.color.g = 0.5
    marker.color.b = 0.5
    marker.color.a = 1.0

    return marker

def makeMesh( meshResource ):
    marker = Marker()

    marker.type = Marker.MESH_RESOURCE;
    marker.mesh_resource = 'file://' + '/home/xyz/Documents/my-md/ROS/code/stl/mesh.STL'
    marker.scale.x = 1
    marker.scale.y = 1
    marker.scale.z = 1
    marker.color.r = 0.5
    marker.color.g = 0.5
    marker.color.b = 0.5
    marker.color.a = 1.0

    return marker



def makeViewFacingMarker(position):
    int_marker = InteractiveMarker()
    int_marker.header.frame_id = "base_link"
    int_marker.pose.position = position
    int_marker.scale = 1

    int_marker.name = "view_facing"
    int_marker.description = "View Facing 6-DOF"

    # make a control that rotates around the view axis
    control = InteractiveMarkerControl()
    control.orientation_mode = InteractiveMarkerControl.VIEW_FACING
    control.interaction_mode = InteractiveMarkerControl.ROTATE_AXIS
    control.orientation.w = 1
    control.name = "rotate"
    int_marker.controls.append(control)

    # create a box in the center which should not be view facing,
    # but move in the camera plane.
    control = InteractiveMarkerControl()
    control.orientation_mode = InteractiveMarkerControl.VIEW_FACING
    control.interaction_mode = InteractiveMarkerControl.MOVE_PLANE
    control.independent_marker_orientation = True
    control.name = "move"
    control.markers.append( makeBox(int_marker) )
    control.always_visible = True
    int_marker.controls.append(control)

    server.insert(int_marker, processFeedback)



if __name__=="__main__":
    rospy.init_node("simple_marker")
    
    # create an interactive marker server on the topic namespace simple_marker
    server = InteractiveMarkerServer("simple_marker")
    
    # create an interactive marker for our server
    int_marker = InteractiveMarker()
    int_marker.header.frame_id = "base_link"
    int_marker.name = "my_marker"
    int_marker.description = "Simple 1-DOF Control"

    # create a non-interactive control which contains the box
    box_control = InteractiveMarkerControl()
    box_control.always_visible = True
    box_control.markers.append( makeMesh('file://' + '/home/xyz/Documents/my-md/ROS/code/stl/mesh.STL') )

    # add the control to the interactive marker
    int_marker.controls.append( box_control )

    rotate_control = InteractiveMarkerControl()
    rotate_control.name = "move_rotate"
    rotate_control.interaction_mode = InteractiveMarkerControl.MOVE_ROTATE

    # add the control to the interactive marker
    int_marker.controls.append(rotate_control);

    x_control = InteractiveMarkerControl()
    x_control.name = "move_rotate_3d"
    x_control.interaction_mode = InteractiveMarkerControl.MOVE_ROTATE_3D

    int_marker.controls.append(x_control)


    # add the interactive marker to our collection &
    # tell the server to call processFeedback() when feedback arrives for it
    server.insert(int_marker, processFeedback)

    position = Point(-1, -3, 0)
    makeViewFacingMarker( position )

    # 'commit' changes and send to all clients
    server.applyChanges()

    rospy.spin()
